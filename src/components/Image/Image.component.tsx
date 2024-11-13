import { useEffect, useState } from "react";
import { IStoryComponentProps } from "../../types";
import styles from "./Image.module.css";
import Loader from "../Loader/Loader";
import { TEST_ID } from "../../common/constants";

export const Image = (props: IStoryComponentProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    props.onPause();
  }, []);

  const handleLoadImage = () => {
    setTimeout(() => setLoaded(true), 300);
    setTimeout(() => {
      props.onResume();
    }, 4);
  };

  return (
    <div>
      <img
        className={styles.image}
        src={props.story.url}
        alt="story" //@todo make dynamic
        onLoad={handleLoadImage}
        data-testid={TEST_ID.IMAGE} //@todo make dynamic
      />
      {!loaded && (
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "45%",
            marginInline: "auto",
            width: "50px",
            height: "50px",
            zIndex: 9,
            color: "#ccc",
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};
