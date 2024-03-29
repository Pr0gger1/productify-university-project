import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../../../store/reducers/TaskSlice";

import DeleteButton from "../../button/DeleteButton";

import { sendRequestWithDelay } from "../../../../utils/requests";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers';

import { selectedTaskSelector } from "../../../../store";
import dayjs from "dayjs";
import styles from "../styles/TaskDatesSection.module.scss";

const ReminderPicker = ({ setShowReminderPicker }) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectedTaskSelector);

    const [reminderDate, setReminderDate] = useState(selectedTask.reminder);

    const onReminderChange = async value => {
        setReminderDate(value.toDate().getTime());

        const taskData = {
            ...selectedTask,
            reminder: value.toDate().getTime(),
            isRemindNotified: false
        };

        await sendRequestWithDelay(() => {
            dispatch(updateTaskAsync(taskData));
        }, 2000)
    }

    const deleteReminderHandler = () => {
        const taskData = {
            ...selectedTask,
            reminder: null
        };

        delete taskData.isRemindNotified;

        dispatch(updateTaskAsync(taskData));
        setShowReminderPicker(false);
    }

    return (
        <div className={styles.date__container}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <MobileDateTimePicker
                    label={'Напоминание'}
                    value={dayjs(reminderDate)}
                    onChange={async val => await onReminderChange(val)}
                    sx = {{
                        label: {
                          color: 'var(--fontColor)'
                        },
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "var(--fontColor)",
                        },
                        ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                            border: "1px solid var(--borderColor)"
                        }
                    }}
                    ampm={false}
                />
             </LocalizationProvider>

            <DeleteButton
                sx={{
                    padding: 2
                }}
                onClick={deleteReminderHandler}
            />
        </div>
    );
};

export default ReminderPicker;