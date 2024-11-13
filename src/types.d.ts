export interface IUser {
  id: number;
  iconUrl: string;
  stories: Array;
  viewed: boolean
}
interface IStoryObject {
  type: string;
  url: string;
  duration: number;
  header?: any;
}

interface IStoryIndexedObject extends IStoryObject {
  index: number;
  calculatedDuration: number;
}

interface IStoryClassNames {
  main?: string;
  progressContainer?: string;
  progressBarContainer?: string;
  progressBar?: string;
  storyContainer?: string;
}

export interface IStoryProps {
  stories: IStoryObject[];
  height?: '100%';
  width?: '100%';
  onStoryChange: (currentIndex: number) => void;
  currentIndex?: number;
  defaultDuration?: number;
  loop?: boolean;
  onStoriesStart?: () => void;
  onAllStoriesEnd?: () => void;
  classNames?: IStoryClassNames;
  pauseStoryWhenInActiveWindow?: boolean;
  onNextClick: ()=> void,
  onPrevClick: ()=> void
  onCloseClick: ()=> void;
}

export interface IStoryContext {
  stories: IStoryIndexedObject[];
  height?: '100%';
  width?: '100%';
  defaultDuration: number;
  isPaused: boolean;
  classNames?: IStoryClassNames;
}

export interface IStoryComponentProps {
  story: IStoryIndexedObject;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
}
