import { useRef } from "react";
import { StoriesContext } from "../../context";
import { Actions, Progress, Story } from "../index";
import { IStoryProps, IStoryIndexedObject, IStoryContext } from "../../types";
import { useEffect, useMemo, useState } from "react";
import * as hooks from "../../hooks";
import styles from "../../index.module.scss";
import * as utilities from "../../utilities";
import cross from "../../assets/cross.svg";
import AnimationWrapper from "../AnimationWrapper/Animate";

export default function Stories({
  stories = [],
  width = "100%",
  height = "100%",
  onStoryChange = () => {},
  currentIndex = 0,
  defaultDuration = 5000,
  loop = false,
  onAllStoriesEnd = () => {},
  onStoriesStart = () => {},
  classNames = {},
  pauseStoryWhenInActiveWindow = true,
  onNextClick = () => {},
  onPrevClick = () => {},
  onCloseClick = () => {},
}: IStoryProps): JSX.Element | null {
  const storiesWithIndex: IStoryIndexedObject[] = useMemo(() => {
    return utilities.transformStories(stories, defaultDuration);
  }, [stories, defaultDuration]);

  const [selectedStory, setSelectedStory] = useState<
    IStoryIndexedObject | undefined
  >();
  const firstStoryIndex = 0;
  const lastStoryIndex = stories.length - 1;
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const hasCalledEndedCb = useRef<any>(false);
  const hasCalledStartedCb = useRef<any>(false);

  useEffect(() => {
    if (!hasCalledStartedCb.current) {
      hasCalledStartedCb.current = true;
      onStoriesStart();
    }
  }, [onStoriesStart]);

  useEffect(() => {
    const story = storiesWithIndex[currentIndex];
    if (story) {
      setSelectedStory(story);
    }
  }, [currentIndex, stories]);

  const handleNextClick = () => {
    if (loop && selectedStory?.index === lastStoryIndex) {
      setSelectedStory(storiesWithIndex[firstStoryIndex]);
      return;
    }
    if (!hasCalledEndedCb.current && selectedStory?.index === lastStoryIndex) {
      onAllStoriesEnd();
      hasCalledEndedCb.current = true;
    }
    if (selectedStory?.index === lastStoryIndex) {
      onAllStoriesEnd(); // see this also
      return;
    }
    setSelectedStory((prev) => {
      if (!prev) {
        return storiesWithIndex[0];
      }
      const newIndex = prev?.index + 1;
      return storiesWithIndex[newIndex];
    });
  };
  const handlePrevClick = () => {
    if (selectedStory?.index === firstStoryIndex) {
      onPrevClick();
      return;
    }
    setSelectedStory((prev) => {
      if (!prev) {
        return storiesWithIndex[0];
      }
      const newIndex = prev?.index - 1;
      return storiesWithIndex[newIndex];
    });
  };

  const handlePause = () => {
    setIsPaused(true);
  };
  const handleResume = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (selectedStory) {
      onStoryChange(selectedStory.index);
    }
  }, [selectedStory]);

  hooks.usePausableTimeout(
    () => {
      handleNextClick();
    },
    selectedStory?.calculatedDuration ?? null,
    isPaused
  );

  const contextValue: IStoryContext = {
    stories: storiesWithIndex,
    width,
    height,
    defaultDuration,
    isPaused,
    classNames,
  };

  if (!selectedStory) {
    return null;
  }
  return (
    <StoriesContext.Provider value={contextValue}>
     {/*  <AnimationWrapper> */}
        <div
          className={`${styles.main} ${classNames.main || ""}`}
          style={{ width, height }}
        >
          <Progress
            activeStoryIndex={selectedStory.index}
            isPaused={isPaused}
          />
          <Story
            key={selectedStory.index}
            onPause={handlePause}
            onResume={handleResume}
            story={selectedStory}
            isPaused={isPaused}
          />
          <Actions
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            onPause={handlePause}
            onResume={handleResume}
          />
          <button className={styles.cross} onClick={onCloseClick}>
            <img src={cross} />
          </button>
        </div>
     {/*  </AnimationWrapper> */}
    </StoriesContext.Provider>
  );
}
