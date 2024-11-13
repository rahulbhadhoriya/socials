import { Fragment, useRef, useState } from "react";
import * as CONSTANTS from "./Actions.constants";
import styles from "./Actions.module.css";

interface IActionsProps {
  onNextClick: () => void;
  onPrevClick: () => void;
  onPause: () => void;
  onResume: () => void;
}

type IActionEvent = React.MouseEvent | React.TouchEvent;

export const Actions = ({
  onNextClick,
  onPrevClick,
  onPause,
  onResume,
}: IActionsProps) => {
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const pauseTimerRef = useRef<any>(null);

  const handlePause = (event: IActionEvent) => {
    if(event.defaultPrevented) event.preventDefault();
    event.stopPropagation();
    clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      onPause();
      setIsStoryPaused(true);
    }, 200);
  };

  const handleInteractions = (region: string, event: IActionEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(pauseTimerRef.current);
    if (isStoryPaused) {
      onResume();
      setIsStoryPaused(false);
      return;
    }
    onResume();
    if (region == CONSTANTS.EVENT_REGION.LEFT) {
      onPrevClick();
      return;
    }
    onNextClick();
  };

  const getEvents = (region: string) => {
    return {
      onMouseUp: (e: React.MouseEvent) => handleInteractions(region, e),
      onTouchEnd: (e: React.TouchEvent) => handleInteractions(region, e),
      onTouchStart: (e: React.TouchEvent) => handlePause(e),
      onMouseDown: (e: React.MouseEvent) => handlePause(e),
    };
  };

  return (
    <Fragment>
      <div
        className={styles.left}
        {...getEvents(CONSTANTS.EVENT_REGION.LEFT)}
      />
      <div
        className={styles.right}
        {...getEvents(CONSTANTS.EVENT_REGION.RIGHT)}
      />
    </Fragment>
  );
};
