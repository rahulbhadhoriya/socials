import styles from "./Story.module.css";
import { IStoryComponentProps } from "../../types";
import { Image } from "../Image";
import * as hooks from "../../hooks";

const Story = (props: IStoryComponentProps) => {
  const { classNames } = hooks.useStoriesContext();

  const getHeader = () => { // see if this can also be removed
    if (typeof props.story.header === "function") {
      return <props.story.header />;
    }
    return props.story.header;
  };

  return (
    <div className={`${styles.wrapper} ${classNames?.storyContainer || ""}`}>
      <Image {...props} />
      {props.story.header && <div className={styles.header}>{getHeader()}</div>}
    </div>
  );
};

export default Story;
