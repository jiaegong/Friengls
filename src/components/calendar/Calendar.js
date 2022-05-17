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
import { getCookie } from '../../shared/Cookie';

const CalendarTemplate = ({
  tutorName,
  availability,
  setAvailability,
  primaryColor = '#153587',
  secondaryColor = '#0077ff',
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
  const userName = useSelector((state) => state.user.info.userName);
  // console.log({ tutorName })
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
      <Button
        onClick={handleClick}
        color={available ? 'primary' : 'default'}
        className={className}
        variant={available ? 'contained' : 'outlined'}
      >
        {start} - {end}
      </Button>
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
    // console.log('1 : --------------------');
    // console.log({ availability });
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
    let activeRangeStart = null;
    for (let time of activeDay) {
      if (time.available && !activeRangeStart) activeRangeStart = time.time;
      else if (!time.available && activeRangeStart) {
        output.push({
          start: new Date(`${month} ${day} ${year} ${activeRangeStart}`),
          end: new Date(`${month} ${day} ${year} ${time.time}`),

          // 유저정보 넣어서 성공한곳
          // token: localStorage.getItem('token'),
          // 그럼 디스패치 할대 선생님 id값으로 요청
          userName: userName,
        });
        activeRangeStart = null;
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
    // console.log("moment : ", today);

    // timeList 불러와서 저장되있는 곳 유무를 불러오는거.
    const [availabilityState, setAvailabilityState] = useState(
      convertAvailabilityFromDatabase(availability),
    );
    // console.log({ availabilityState });
    // console.log('5');

    // 선택한 시간 값 받아 오는 stats
    const [quickAvailability, setQuickAvailability] = useState(
      makeQuickAvailability(availability),
    );
    console.log({ quickAvailability });

    const [activeDay, setActiveDay] = useState(null);
    const [year, setYear] = useState(Number(today.format('YYYY')));
    // console.log({ year });

    // "월 number" 데이터 받는곳
    const [monthNumber, setMonthNumber] = useState(Number(today.format('M')));
    // const [settingMultiple, setSettingMultiple] = useState(false);

    const months = useMonths(year);
    // console.log({ months });

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
      // console.log({ i });
      const newTimes = [...times];
      newTimes[i].available = !newTimes[i].available;
      if (activeDay) {
        addTimeToDay(newTimes);
      }
      setTimes(newTimes);
    };

    // 클릭한 일의 data를 가져오는 함수.
    const createDayHandler = (day) => () => {
      // if (settingMultiple) {
      // addTimesToDay(day);
      // } else {
      console.log('선택한 날 : ', day);
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
      const data = convertAvailabilityForDatabase(availabilityState);
      const dataLength = data.length - 1;
      setSaving(true);

      // useState로 값 저장해주는거!!!!!!!
      // dispatch 할때 userName 같이 보내줘야된다.

      dispatch(calendarActions.setBookingDB(data, tutorName));
      setAvailability(data);
      // db로 예약 정보 넘기는 값
      // console.log(data);

      // console.log(data[dataLength].start);
      // console.log(data[dataLength].end);
      // const startTime = data[dataLength].start;
      // const endTime = data[dataLength].end;

      // let [week, month, day, year, sTime] = startTime.toString().split(' ');
      // let start = sTime.substr(0, 5);
      // let end = endTime.toString().substr(-26, 5);

      // console.log({ week, month, day, year });
      // console.log({ start, end });

      // alert(`${month} ${day} ${start} - ${end} 예약 되었습니다!!`);
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

    const test = 'test00';

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

      // console.log("시간대 한번에 다 불러오는 아이:", newAvail);
      // console.log("test", newAvail.hasOwnProperty(year));
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
