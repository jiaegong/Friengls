import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './calendar.css';
import {
  IconButton,
  Grid,
  makeStyles,
  Card,
  Button,
  ThemeProvider,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as calendarActions } from '../../redux/modules/booking';
import { history } from '../../redux/configureStore';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const CalendarTemplate = ({
  tutorName,
  availability,
  setAvailability,
  primaryColor = '#08a9ff',
  secondaryColor = '#ff0000',
  fontFamily = 'Noto Sans',
  fontSize = 12,
  primaryFontColor = '#131313',

  // 예약 가능 시간 범위 설정
  // 8시간
  startTime = '8:00',
  endTime = '20:00',
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const saveDataCount = availability.length + 1;

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
        save: false,
      },
      {
        time: '1:00',
        available: false,
        save: false,
      },
      {
        time: '2:00',
        available: false,
        save: false,
      },
      {
        time: '3:00',
        available: false,
        save: false,
      },
      {
        time: '4:00',
        available: false,
        save: false,
      },
      {
        time: '5:00',
        available: false,
        save: false,
      },
      {
        time: '6:00',
        available: false,
        save: false,
      },
      {
        time: '7:00',
        available: false,
        save: false,
      },
      {
        time: '8:00',
        available: false,
        save: false,
      },
      {
        time: '9:00',
        available: false,
        save: false,
      },
      {
        time: '10:00',
        available: false,
        save: false,
      },
      {
        time: '11:00',
        available: false,
        save: false,
      },
      {
        time: '12:00',
        available: false,
        save: false,
      },
      {
        time: '13:00',
        available: false,
        save: false,
      },
      {
        time: '14:00',
        available: false,
        save: false,
      },
      {
        time: '15:00',
        available: false,
        save: false,
      },
      {
        time: '16:00',
        available: false,
        save: false,
      },
      {
        time: '17:00',
        available: false,
        save: false,
      },
      {
        time: '18:00',
        available: false,
        save: false,
      },
      {
        time: '19:00',
        available: false,
        save: false,
      },
      {
        time: '20:00',
        available: false,
        save: false,
      },
      {
        time: '21:00',
        available: false,
        save: false,
      },
      {
        time: '22:00',
        available: false,
        save: false,
      },
      {
        time: '23:00',
        available: false,
        save: false,
      },
      {
        time: '0:00',
        available: false,
        save: false,
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
  function TimeButton({ className, start, end, available, handleClick, save }) {
    return (
      <>
        {save ? (
          <button
            style={{
              color: '#fff',
              background: '#aaaaaa',
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
            disabled={save ? 'disabled' : ''}
          >
            {t('already booked')}
          </button>
        ) : available ? (
          <button
            className={className}
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
              variant: 'contained',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            {start} - {end}
          </button>
        ) : (
          <button
            className={className}
            style={{
              color: '#000000',
              background: '#ffffff',
              margin: '10px',
              minWidth: '200px',
              height: '33.44px',
              padding: '5px 15px',
              boxSizing: 'border-box',
              transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              borderRadius: '4px',
              fontWeight: '500',
              lineHeight: '1.75',
              textTransform: 'uppercase',
              border: ' 1px solid rgba(0, 0, 0, 0.23)',
              variant: 'contained',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            {start} - {end}
          </button>
        )}
      </>
    );
  }

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

  // DB에 있는 값 불러와서 값이 있는지 체크 하는곳.
  const convertAvailabilityFromDatabase = (availability) => {
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
        output[year][month][day][i].save = true;
        i++;
      }
    }
    return output;
  };

  //!!!!!!!!!!!!
  const convertAvailabilityForDatabase = (availability) => {
    const output = [];
    for (let year in availability) {
      for (let month in availability[year]) {
        for (let day in availability[year][month]) {
          let activeDay = availability[year][month][day];
          addActiveDayToOutput(activeDay, output, month, day, year);
        }
      }
    }

    if (saveDataCount < output.length) {
      // alert('선택하실수 있는 갯수를 초과 하셨습니다.');
      Swal.fire({
        // text: '선택하실수 있는 갯수를 초과 하셨습니다.',
        text: t('You have exceeded the number that can be selected'),
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('confirm'),
        // confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    return output;
  };

  // 저장할 값 지정해주는 곳!!!!
  function addActiveDayToOutput(activeDay, output, month, day, year) {
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
    const output = {};
    for (let range of availability) {
      if (new Date(range.start) > new Date()) {
        let day = moment(range.start).format('MMMM D, YYYY');
        let time = `${moment(range.start).format('H:mm')} - ${moment(
          range.end,
        ).format('H:mm')}`;

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

    // timeList 불러와서 저장되있는 곳 유무를 불러오는거.
    const [availabilityState, setAvailabilityState] = useState(
      convertAvailabilityFromDatabase(availability),
    );

    // 선택한 시간 값 받아 오는 stats
    const [quickAvailability, setQuickAvailability] = useState(
      makeQuickAvailability(availability),
    );

    const [activeDay, setActiveDay] = useState(null);
    const [year, setYear] = useState(Number(today.format('YYYY')));

    // "월 number" 데이터 받는곳
    const [monthNumber, setMonthNumber] = useState(Number(today.format('M')));

    const months = useMonths(year);

    const { firstDay, month, lastDay } = months[monthNumber];
    let dayOfWeek = Number(moment(firstDay).format('d'));
    const days = getDaysArray();
    const [times, setTimes] = useState(getDefaultTimes());
    const [saving, setSaving] = useState(false);
    let week = 0;
    let dayOfMonth = 1;

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
      newTimes[i].available = !newTimes[i].available;
      if (activeDay) {
        addTimeToDay(newTimes);
      }
      setTimes(newTimes);
    };

    // 클릭한 일의 data를 가져오는 함수.
    const createDayHandler = (day) => () => {
      examineAvailabilityForDay(day);
    };

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
          title: t('did you sign in?'),
          text: t('it is available after you sign in!'),
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: t('confirm'),
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

        const ABstart = Astart.filter((time, index) => !Bstart.includes(time));

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
                      return (
                        <Grid key={i} item>
                          <Grid container direction="row">
                            {/* 여기가 day!!!!! */}
                            {week.map((day, i) => {
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
                          i < times.length - 7 && (
                            <TimeButton
                              key={time.time}
                              className={classes.button}
                              start={time.time}
                              end={times[i + 1].time}
                              handleClick={createTimeHandler(i)}
                              available={time.available}
                              save={time.save}
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
                          i < times.length - 1 &&
                          i > 5 && (
                            <TimeButton
                              key={time.time}
                              className={classes.button}
                              start={time.time}
                              end={times[i + 1].time}
                              handleClick={createTimeHandler(i)}
                              available={time.available}
                              save={time.save}
                            />
                          ),
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className="calendarTextWrap">
            <div className="calendarTextInner">
              <span className="calendarInfo">
                <span className="redColor"></span> {t('booked date')}
              </span>
              <span className="calendarInfo">
                <span className="blueColor"></span> {t('selected date')}
              </span>
            </div>

            <p className="calendarText">
              * {t('booking is only available for one hour at a time')}
            </p>
          </div>
          <Grid item className="btnWrap">
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className="saveBtn">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSaveAvailability}
                    className={classes.button}
                  >
                    {t('book a lesson')}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );

    // 선택한 시간을 한 날에 추가하는 기능
    function addTimeToDay(newTimes) {
      const newAvail = availabilityState;
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
  };
};

export default CalendarTemplate;
