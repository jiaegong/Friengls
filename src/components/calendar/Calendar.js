import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './calendar.css';
import {
  IconButton,
  Grid,
  makeStyles,
  Card,
  Button,
  CircularProgress,
  // Popover,
  ThemeProvider,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as calendarActions } from '../../redux/modules/booking';
import { history } from '../../redux/configureStore';

import Swal from 'sweetalert2';

const CalendarTemplate = ({
  tutorName,
  availability,
  setAvailability,
  primaryColor = '#153587',
  secondaryColor = '#ff0000',
  fontFamily = 'Noto Sans',
  fontSize = 12,
  primaryFontColor = '#131313',

  // 예약 가능 시간 범위 설정

  // 8시간
  startTime = '8:00',
  endTime = '20:00',

  // 24시간
  // startTime = "0:00",
  // endTime = "24:00",
}) => {
  const dispatch = useDispatch();
  // const Swal = require('sweetalert2');
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);

  // 스타일 지정 해주는거
  const theme = createTheme({
    typography: {
      fontFamily: `${fontFamily}`,
      fontSize: fontSize,
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      text: {
        primary: primaryFontColor,
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    calendar: {
      fontFamily: theme.typography.fontFamily,
    },
    calendarText: {
      margin: 0,
      width: 25,
      height: 25,
      textAlign: 'center',
    },
    button: {
      minWidth: 200,
      margin: 10,
      fontFamily: theme.typography.fontFamily,
    },
    buttonNoMargin: {
      minWidth: 200,
      fontFamily: theme.typography.fontFamily,
    },
    // test: {
    //   marginTop: 50,
    // },
    // popover: {
    //   pointerEvents: "none",
    //   fontFamily: theme.typography.fontFamily,
    // },
    paper: {
      padding: theme.spacing(1),
    },
  }));

  // 월
  const useMonths = (year) => ({
    1: {
      lastDay: 31,
      month: 'January',
      firstDay: moment(`${year}-01-01`),
    },
    2: {
      lastDay: year % 4 === 0 ? 29 : 28,
      month: 'February',
      firstDay: moment(`${year}-02-01`),
    },
    3: {
      lastDay: 31,
      month: 'March',
      firstDay: moment(`${year}-03-01`),
    },
    4: {
      lastDay: 30,
      month: 'April',
      firstDay: moment(`${year}-04-01`),
    },
    5: {
      lastDay: 31,
      month: 'May',
      firstDay: moment(`${year}-05-01`),
    },
    6: {
      lastDay: 30,
      month: 'June',
      firstDay: moment(`${year}-06-01`),
    },
    7: {
      lastDay: 31,
      month: 'July',
      firstDay: moment(`${year}-07-01`),
    },
    8: {
      lastDay: 31,
      month: 'August',
      firstDay: moment(`${year}-08-01`),
    },
    9: {
      lastDay: 30,
      month: 'September',
      firstDay: moment(`${year}-09-01`),
    },
    10: {
      lastDay: 31,
      month: 'October',
      firstDay: moment(`${year}-10-01`),
    },
    11: {
      lastDay: 30,
      month: 'November',
      firstDay: moment(`${year}-11-01`),
    },
    12: {
      lastDay: 31,
      month: 'December',
      firstDay: moment(`${year}-12-01`),
    },
  });

  // 시간
  const getDefaultTimes = () => {
    const times = [
      {
        time: '0:00',
        available: false,
      },
      {
        time: '1:00',
        available: false,
      },
      {
        time: '2:00',
        available: false,
      },
      {
        time: '3:00',
        available: false,
      },
      {
        time: '4:00',
        available: false,
      },
      {
        time: '5:00',
        available: false,
      },
      {
        time: '6:00',
        available: false,
      },
      {
        time: '7:00',
        available: false,
      },
      {
        time: '8:00',
        available: false,
      },
      {
        time: '9:00',
        available: false,
      },
      {
        time: '10:00',
        available: false,
      },
      {
        time: '11:00',
        available: false,
      },
      {
        time: '12:00',
        available: false,
      },
      {
        time: '13:00',
        available: false,
      },
      {
        time: '14:00',
        available: false,
      },
      {
        time: '15:00',
        available: false,
      },
      {
        time: '16:00',
        available: false,
      },
      {
        time: '17:00',
        available: false,
      },
      {
        time: '18:00',
        available: false,
      },
      {
        time: '19:00',
        available: false,
      },
      {
        time: '20:00',
        available: false,
      },
      {
        time: '21:00',
        available: false,
      },
      {
        time: '22:00',
        available: false,
      },
      {
        time: '23:00',
        available: false,
      },
      {
        time: '0:00',
        available: false,
      },
    ];
    let include = false;
    return times.filter((time) => {
      if (time.time === startTime) {
        include = true;
      }
      if (time.time === endTime) {
        include = false;
        return true;
      }
      return include;
    });
  };

  //  시간 버튼 컴포넌트
  function TimeButton({ className, start, end, available, handleClick }) {
    return (
      <>
        {available ? (
          <button
            style={{
              color: '#fff',
              background: '#153587',
              margin: '10px',
              minWidth: '200px',
              padding: '5px 15px',
              boxSizing: 'border-box',
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              borderRadius: '4px',
              fontWeight: '500',
              lineHeight: '1.75',
              textTransform: 'uppercase',
              boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
              border: 'none',
            }}
            onClick={handleClick}
            disabled={available ? 'disabled' : ''}
          >
            {start} - {end}
          </button>
        ) : (
          // <Button
          //   onClick={handleClick}
          //   color={'primary'}
          //   className={className}
          //   variant={'contained'}
          //   disabled={available ? 'disabled' : 'none'}
          // >
          //   {start} - {end}
          // </Button>
          <Button
            onClick={handleClick}
            color={'default'}
            className={className}
            variant={'outlined'}
          >
            {start} - {end}
          </Button>
        )}
        {/* <Button
          onClick={handleClick}
          color={available ? 'primary' : 'default'}
          className={className}
          variant={available ? 'contained' : 'outlined'}
          // disabled
        >
          {start} - {end}
        </Button> */}
      </>
    );
  }

  // const StyledBtn = styled.button`

  // `

  function getDaysArray() {
    return [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
  }

  const convertAvailabilityFromDatabase = (availability) => {
    // console.log({ availability });
    const output = {};
    for (let range of availability) {
      let start = moment(range.start);
      let startTime = `${start.format('H')}:${start.format('mm')}`;
      let end = moment(range.end);
      let endTime = `${end.format('H')}:${end.format('mm')}`;
      let year = Number(start.format('YYYY'));
      let month = start.format('MMMM');
      let day = Number(start.format('D'));
      fillOutputWithDefaultTimes(output, year, month, day);
      let i = 0;
      while (
        i < output[year][month][day].length &&
        output[year][month][day][i].time !== startTime
      )
        i++;
      while (
        i < output[year][month][day].length &&
        output[year][month][day][i].time !== endTime
      ) {
        output[year][month][day][i].available = true;
        i++;
      }
    }
    // console.log({ output });
    return output;
  };

  //!!!!!!!!!!!!
  const convertAvailabilityForDatabase = (availability) => {
    console.log({ availability });

    const output = [];
    for (let year in availability) {
      for (let month in availability[year]) {
        for (let day in availability[year][month]) {
          let activeDay = availability[year][month][day];
          addActiveDayToOutput(activeDay, output, month, day, year);
        }
      }
    }
    console.log({ output });
    return output;
  };

  //  여러날에 중복을로 시간 저장 할떄 사용하는 기능중 하나
  // const combineTimeArrays = (a, b) => {
  //   for (let i = 0; i < a.length; i++) {
  //     a[i].available = a[i].available || b[i].available;
  //   }
  //   return a;
  // };

  // 저장할 값 지정해주는 곳!!!!
  function addActiveDayToOutput(activeDay, output, month, day, year) {
    console.log({ activeDay, output, month, day, year });

    // else if () {

    // }

    let activeRangeStart = null;
    let activeRangeEnd = null;

    for (let time of activeDay) {
      if (time.available) {
        // 버튼이 활성화 되있고,
        if (!activeRangeStart) {
          //시작 범위가 없을때
          activeRangeStart = time.time;
        } else if (activeRangeStart) {
          // 시작 범위가 있을때

          // 앞에 저장 되있는게 있을때 뒷시간대를 저장하게되면, 앞에 시간대 정보가 사라지는 이슈!!
          // 그래서 앞에 시간대가 있을때는 다음 시간대를 end처리를 해주어, 저장하면 문제가 해결된다!!
          activeRangeEnd = time.time;

          output.push({
            start: new Date(`${month} ${day} ${year} ${activeRangeStart}`),
            end: new Date(`${month} ${day} ${year} ${activeRangeEnd}`),
          });

          // 그리고 다시 시작시간대를 지정해주고, end 시간대는 null로 정리 해주면 된다!!
          activeRangeStart = time.time;
          activeRangeEnd = null;
        }
      }

      if (!time.available && activeRangeStart) {
        // 버튼이 비활성화 상태이며, 시작 범위가 있을때

        activeRangeEnd = time.time;
        // console.log('시작 범위 : ', { activeRangeStart });
        // console.log('끝나는 범위  : ', { activeRangeEnd });

        output.push({
          start: new Date(`${month} ${day} ${year} ${activeRangeStart}`),
          end: new Date(`${month} ${day} ${year} ${activeRangeEnd}`),
        });

        activeRangeStart = null;
        activeRangeEnd = null;
      }
    }
  }

  function fillOutputWithDefaultTimes(output, year, month, day) {
    if (output.hasOwnProperty(year)) {
      if (output[year].hasOwnProperty(month)) {
        if (!output[year][month].hasOwnProperty(day)) {
          output[year][month][day] = getDefaultTimes();
        }
      } else {
        output[year][month] = {
          [day]: getDefaultTimes(),
        };
      }
    } else {
      output[year] = {
        [month]: {
          [day]: getDefaultTimes(),
        },
      };
    }
  }

  function makeQuickAvailability(availability) {
    console.log({ availability });
    const output = {};
    for (let range of availability) {
      if (new Date(range.start) > new Date()) {
        let day = moment(range.start).format('MMMM D, YYYY');
        let time = `${moment(range.start).format('H:mm')} - ${moment(
          range.end,
        ).format('H:mm')}`;

        // console.log({ day, time });

        if (output[day]) {
          output[day].push(time);
        } else {
          output[day] = [time];
        }
      }
    }
    return output;
  }

  return function Calendar() {
    const classes = useStyles();
    const today = moment();
    // console.log('moment : ', today);

    // timeList 불러와서 저장되있는 곳 유무를 불러오는거.
    const [availabilityState, setAvailabilityState] = useState(
      convertAvailabilityFromDatabase(availability),
    );
    // console.log({ availabilityState });

    // 선택한 시간 값 받아 오는 stats
    const [quickAvailability, setQuickAvailability] = useState(
      makeQuickAvailability(availability),
    );
    // console.log({ quickAvailability });

    const [activeDay, setActiveDay] = useState(null);
    const [year, setYear] = useState(Number(today.format('YYYY')));

    // console.log({ activeDay });
    // console.log({ year });

    // "월 number" 데이터 받는곳
    const [monthNumber, setMonthNumber] = useState(Number(today.format('M')));
    // const [settingMultiple, setSettingMultiple] = useState(false);

    // console.log({ monthNumber });

    const months = useMonths(year);

    const { firstDay, month, lastDay } = months[monthNumber];
    let dayOfWeek = Number(moment(firstDay).format('d'));
    const days = getDaysArray();
    const [times, setTimes] = useState(getDefaultTimes());
    const [saving, setSaving] = useState(false);
    let week = 0;
    let dayOfMonth = 1;
    // console.log({ times });
    // console.log({ saving });

    while (week < 6 && dayOfMonth <= lastDay) {
      days[week][dayOfWeek] = dayOfMonth;
      dayOfMonth++;
      dayOfWeek++;
      if (dayOfWeek === 7) {
        week++;
        dayOfWeek = 0;
      }
    }

    const createArrowHandler = (delta) => () => {
      let newMonth = monthNumber + delta;
      if (newMonth > 12) {
        setYear(year + 1);
        newMonth = 1;
      } else if (newMonth < 1) {
        setYear(year - 1);
        newMonth = 12;
      }
      setActiveDay(null);
      setTimes(getDefaultTimes());
      setMonthNumber(newMonth);
    };

    //  시간버튼이 몇 번째인지.
    const createTimeHandler = (i) => () => {
      const newTimes = [...times];
      console.log({ newTimes });
      newTimes[i].available = !newTimes[i].available;
      console.log(newTimes[i].available);
      if (activeDay) {
        console.log({ activeDay });
        addTimeToDay(newTimes);
      }
      setTimes(newTimes);
    };

    // 클릭한 일의 data를 가져오는 함수.
    const createDayHandler = (day) => () => {
      // if (settingMultiple) {
      // addTimesToDay(day);
      // } else {
      // console.log('선택한 날 : ', day);
      examineAvailabilityForDay(day);
      // }
    };

    // 선택한 시간 여러 날짜에 한번에 저장하는 기능
    // const handleSetMultiple = () => {
    //   setActiveDay(null);
    //   setSettingMultiple(!settingMultiple);
    // };

    // 저장 버튼
    const handleSaveAvailability = () => {
      // outPut 값이 return 되어서 data에 반환됨. convertAvailabilityForDatabase === output
      const data = convertAvailabilityForDatabase(availabilityState);

      setSaving(true);
      let onePick1 = [];
      let onePick2 = [];

      if (
        (isLogin === false && activeDay === null) ||
        (activeDay && isLogin === false)
      ) {
        Swal.fire({
          title: '로그인 하셨나요?',
          text: '로그인후 사용이 가능 합니다!~',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/login');
          }
        });
      }

      if (isLogin === true) {
        if (typeof availability[0]?.start === 'string') {
          for (let i = 0; i < availability.length; i++) {
            onePick1.push({
              start: availability[i].start,
              end: availability[i].end,
            });
          }
        } else {
          for (let i = 0; i < availability.length; i++) {
            onePick1.push({
              start: availability[i].start
                .toString()
                .replace(' (한국 표준시)', ''),
              end: availability[i].end.toString().replace(' (한국 표준시)', ''),
            });
          }
        }

        for (let i = 0; i < data.length; i++) {
          onePick2.push({
            start: data[i].start.toString().replace(' (한국 표준시)', ''),
            end: data[i].end.toString().replace(' (한국 표준시)', ''),
          });
        }

        const Astart = [];
        for (let i = 0; i < onePick2.length; i++) {
          Astart.push(onePick2[i].start);
        }
        const Bstart = [];
        for (let i = 0; i < onePick1.length; i++) {
          Bstart.push(onePick1[i].start);
        }

        // console.log('현재 저장되어 있는 값 : ', { availability });
        // console.log('저장 하려고 하는 값 : ', { data });

        // console.log('저장 하려고 비교 data : ', onePick1);
        // console.log('현재 저장 비교 availability : ', onePick2);

        const ABstart = Astart.filter((time, index) => !Bstart.includes(time));
        console.log('ABstart : ', { ABstart });

        const goDB = onePick2.filter(
          (time, index) => time.start === ABstart[0],
        );
        console.log('goDB : ', { goDB });
        console.log({ data });
        dispatch(calendarActions.setBookingDB(goDB, tutorName));
        setAvailability(data);
      }
    };

    // 현재의 달로 오는 기능
    const handleJumpToCurrent = () => {
      setYear(Number(today.format('YYYY')));
      setMonthNumber(Number(today.format('M')));
      setActiveDay(null);
      setTimes(getDefaultTimes());
    };

    // 호버 액션 관리
    // const [anchorEl, setAnchorEl] = useState(null);
    // console.log({ anchorEl });
    // const [popoverContent, setPopoverContent] = useState(null);
    // console.log({ popoverContent });
    // // 호버시 예약 시간 나타 나는 액션
    // const handleOpenPopover = date => {
    //   console.log(date);
    //   return e => {
    //     console.log({ e });
    //     if (quickAvailability[date]) {
    //       setPopoverContent(
    //         quickAvailability[date].map((time, idx) => (
    //           <p key={time + idx}>{time}</p>
    //         ))
    //       );
    //       setAnchorEl(e.target);
    //     }
    //   };
    // };
    // // 마우스 아웃시에 다시 원상태로 돌리는 액션
    // const handleClosePopover = () => {
    //   setAnchorEl(null);
    //   setPopoverContent(null);
    // };

    return (
      <ThemeProvider theme={theme}>
        <Grid
          className={classes.calendar}
          container
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <IconButton
                  disabled={
                    year === Number(today.format('YYYY')) &&
                    month === today.format('MMMM')
                  }
                  onClick={createArrowHandler(-1)}
                >
                  <ArrowLeft />
                </IconButton>
              </Grid>

              {/* 달력 부분 */}
              <Grid item>
                <Card style={{ padding: 10, margin: 10 }} variant="outlined">
                  <Grid container direction="column" alignItems="center">
                    <h3 className="calendarTitle">
                      {/* 달력 타이틀 부분 */}
                      {month} {year}
                    </h3>

                    {/* 이게 week !!!!! */}
                    {days.map((week, i) => {
                      // console.log({ week });
                      return (
                        <Grid key={i} item>
                          <Grid container direction="row">
                            {/* 여기가 day!!!!! */}
                            {week.map((day, i) => {
                              // console.log({ day });
                              return (
                                <Grid key={year + month + i} item>
                                  <IconButton
                                    onClick={createDayHandler(day)}
                                    color={
                                      activeDay === day
                                        ? 'primary'
                                        : availabilityState[year] &&
                                          availabilityState[year][month] &&
                                          availabilityState[year][month][day] &&
                                          availabilityState[year][month][
                                            day
                                          ].filter((x) => x.available).length >
                                            0
                                        ? 'secondary'
                                        : 'default'
                                    }
                                    disabled={
                                      !day ||
                                      (year === Number(today.format('YYYY')) &&
                                        month === today.format('MMMM') &&
                                        day < Number(today.format('D')))
                                    }
                                    size="medium"
                                  >
                                    <p className={classes.calendarText}>
                                      {/* day 숫자 부분 */}
                                      {day}
                                    </p>
                                  </IconButton>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      );
                    })}

                    <Button
                      disabled={
                        year === Number(today.format('YYYY')) &&
                        month === today.format('MMMM')
                      }
                      onClick={handleJumpToCurrent}
                      className={classes.buttonNoMargin}
                    >
                      Jump to Current Month
                    </Button>
                  </Grid>
                </Card>
              </Grid>

              {/* 다음 달로 넘어가는 버튼 */}
              <Grid item>
                <IconButton onClick={createArrowHandler(1)}>
                  <ArrowRight />
                </IconButton>
              </Grid>

              {/* 시간 버튼 부분 */}
              <Grid item>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  wrap="wrap"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      wrap="wrap"
                    >
                      {/* 왼쪽 부분 */}
                      {times.map(
                        (time, i) =>
                          // 원본...
                          i < times.length - 7 && (
                            // // 0:00 ~ 11:00
                            // i < times.length - 13 && (
                            <TimeButton
                              key={time.time}
                              className={classes.button}
                              start={time.time}
                              end={times[i + 1].time}
                              handleClick={createTimeHandler(i)}
                              available={time.available}
                            />
                          ),
                      )}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      wrap="wrap"
                    >
                      {/* 오른쪽 부분 */}
                      {times.map(
                        (time, i) =>
                          // 원본...
                          i < times.length - 1 &&
                          i > 5 && (
                            // // 12:00 ~ 23:00
                            // i < times.length - 1 &&
                            // i > 11 && (
                            <TimeButton
                              key={time.time}
                              className={classes.button}
                              start={time.time}
                              end={times[i + 1].time}
                              handleClick={createTimeHandler(i)}
                              available={time.available}
                            />
                          ),
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSetMultiple}
                  className={classes.button}
                >
                  {settingMultiple
                    ? 'Done'
                    : 'Add Selected Times to Multiple Days'}
                </Button>
              </Grid> */}

              <Grid item>
                {saving ? (
                  <CircularProgress />
                ) : (
                  <div className="saveBtn">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSaveAvailability}
                      className={classes.button}
                    >
                      수강 예약하기
                    </Button>
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                        marginTop: '10px',
                        width: '30px',
                        height: '30px',
                        fontSize: '34px',
                        position: 'absolute',
                        right: '-80px',
                        top: '0px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      ♻️
                    </span>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );

    // 선택한 시간을 한 날에 추가하는 기능
    function addTimeToDay(newTimes) {
      const newAvail = availabilityState;
      // console.log({ newAvail });

      // console.log("시간대 한번에 다 불러오는 아이:", newAvail);

      // console.log('2 : ', newAvail[year].hasOwnProperty(month));
      // console.log("선택한 날의 값", activeDay);
      if (newAvail.hasOwnProperty(year)) {
        if (newAvail[year].hasOwnProperty(month)) {
          newAvail[year][month][activeDay] = newTimes;
        } else {
          newAvail[year][month] = {
            [activeDay]: newTimes,
          };
        }
      } else {
        newAvail[year] = {
          [month]: {
            [activeDay]: newTimes,
          },
        };
      }
      setAvailabilityState(newAvail);
      setQuickAvailability(
        makeQuickAvailability(convertAvailabilityForDatabase(newAvail)),
      );
    }

    function examineAvailabilityForDay(day) {
      if (
        availabilityState[year] &&
        availabilityState[year][month] &&
        availabilityState[year][month][day]
      ) {
        setTimes(availabilityState[year][month][day]);
      } else {
        setTimes(getDefaultTimes());
      }
      setActiveDay(day);
    }

    // 여러 시간을 다른날에 한번에 추가 하는 기능
    // function addTimesToDay(day) {
    //   const newAvail = { ...availabilityState };
    //   if (newAvail[year]) {
    //     if (newAvail[year][month]) {
    //       if (newAvail[year][month][day]) {
    //         newAvail[year][month][day] = combineTimeArrays(
    //           newAvail[year][month][day],
    //           times
    //         );
    //       } else {
    //         newAvail[year][month][day] = times;
    //       }
    //     } else {
    //       newAvail[year][month] = {
    //         [day]: times,
    //       };
    //     }
    //   } else {
    //     newAvail[year] = {
    //       [month]: {
    //         [day]: times,
    //       },
    //     };
    //   }
    //   setAvailabilityState(newAvail);
    //   setQuickAvailability(
    //     makeQuickAvailability(convertAvailabilityForDatabase(newAvail))
    //   );
    // }
  };
};

export default CalendarTemplate;
