import React, {useState} from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import styles from './Calender.module.css';

const Calender = ({badge, headingText, highlightedDaysList}) => {
    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState(highlightedDaysList);

    return (
        <div className={styles.calenderDiv}>
            <h3 className={styles.headingText}>{headingText}</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                    !DayComponentProps.outsideCurrentMonth &&
                    highlightedDays.indexOf(day.date()) > 0;
        
                    return (
                    <Badge
                        key={day.toString()}
                        overlap="circular"
                        badgeContent={isSelected ? `${badge}` : undefined}
                    >
                        <PickersDay {...DayComponentProps} />
                    </Badge>
                    );
                }}
            />
            </LocalizationProvider>
        </div>
  )
}

export default Calender