import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAsync } from '../../../store/reducers/TaskSlice';

import InputField from '../input/InputField';
import Button from './Button';
import ConfirmationButton from "./ConfirmationButton";

import { baseGroupIds } from '../../../store/defaultData/baseGroups';
import { CSSTransition } from 'react-transition-group';

import styles from './styles/CreateTaskButton.module.scss';
import '../animations/Button/createTaskBtnAnimation.css';
import '../animations/Input/InputAnimation.css';

const CreateTaskButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [taskName, setTaskName] = useState('');

    const dispatch = useDispatch();
    const selectedGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );

    const userCreds = useSelector(
        state => state.authStates.userData
    );

    const addTaskHandler = () => {
        let taskData = {
            taskName,
            completed: false,
            favorite: false,
            createdAt: new Date().getTime(),
            subTasks: [],
            notes: '',
            groupId: selectedGroup.id,
            userId: userCreds.uid,
            category: selectedGroup.title,
            deadline: null,
            reminder: null,
            repeat: null
            };

        if (selectedGroup.id === baseGroupIds.favorite)
            taskData.favorite = true;

        dispatch(addTaskAsync(taskData));
        setTaskName('');
    }

    const onInputKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value.length)
            addTaskHandler();
        else if (event.key === 'Escape')
            setShowInput(false);
    }

    return (
        <>
            <CSSTransition
                in={showButton}
                timeout={300}
                classNames="create_task_btn_animation"
                unmountOnExit
            >
                <Button
                    className={styles.create_task__btn}
                    onClick={() => setShowInput(true)}
                >
                    Добавить задачу
                </Button>
            </CSSTransition>

            <CSSTransition
                in={showInput}
                timeout={700}
                classNames="input_animation"
                onEnter={() => setShowButton(false)}
                onExited={() => setShowButton(true)}
                unmountOnExit
            >
                <div className={styles.add_task_input__container}>
                    {
                        taskName.length ?
                            <ConfirmationButton
                                variant='ok'
                                onClick={addTaskHandler}
                            />
                        :
                            <ConfirmationButton
                                variant='cancel'
                                onClick={() => setShowInput(false)}
                            />
                    }
                    <InputField
                        customClasses={[styles.add_task__btn]}
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        onKeyDown={onInputKeyDown}
                        onClose={() => setShowInput(false)}
                    />
                </div>
            </CSSTransition>
        </>
    );
};

export default CreateTaskButton;