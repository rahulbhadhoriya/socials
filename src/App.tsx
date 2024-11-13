import { lazy, Suspense, useEffect, useState } from "react";
import UserList from "./components/UserView/UserList";
import { IUser } from "./types";
import { fetchUserStories } from "./App.service";
import * as styles from "./index.module.scss";

const StoriesLazy = lazy(() => import("./components/StoriesWrapper/Stories"));

export default function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [currUserIndex, setCurrUserIndex] = useState<number>(0);
  const [currStoryIndex, setCurrStoryIndex] = useState<number>(0);
  const [stories, setStories] = useState([]);

  const getUsers = async () => {
    const users = (await fetchUserStories()) ?? [];
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setStories(selectedUser?.stories);
  }, [selectedUser]);

  const handleUserSelection = (user: IUser) => {
    const currIndex = users.findIndex((u) => u.id === user.id);
    setSelectedUser(user);
    setCurrUserIndex(currIndex);
  };

  const onCurrUserStoriesEnd = () => {
    // select next user
    if (currUserIndex + 1 > users.length - 1) {
      setSelectedUser(null);
      return;
    }
    setSelectedUser(users[currUserIndex + 1]);
    setCurrUserIndex(currUserIndex + 1);
  };

  const handleStoryChange = (storyIndex) => {
    setCurrStoryIndex(storyIndex);
  };

  const handleNextClick = () => {
    //console.log("next", currUserIndex, currStoryIndex);
  };

  const handlePrevClick = () => {
    if (currUserIndex - 1 < 0) {
      setSelectedUser(null);
      return;
    }
    setSelectedUser(users[currUserIndex - 1]);
    setCurrUserIndex(currUserIndex - 1);
  };

  const handleCrossClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //reset state here
    setSelectedUser(null);
    setCurrStoryIndex(0);
    //user index is not reset because we may want to resume from here.
  };

  return (
    <div className={styles.container}>
      <div style={{ display : selectedUser ? 'none': 'block' }}>
        <UserList users={users} setSelectedUser={handleUserSelection} />
      </div>
      <Suspense>
        {selectedUser && (
          <StoriesLazy
            width="100%"
            height="600px"
            stories={stories}
            loop={false}
            onStoryChange={handleStoryChange}
            onAllStoriesEnd={onCurrUserStoriesEnd}
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            onCloseClick={handleCrossClick}
          />
        )}
      </Suspense>
    </div>
  );
}
