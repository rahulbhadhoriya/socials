import * as styles from "../../index.module.scss";
import { IUser } from "../../types";

interface IUserProps {
  user: IUser;
  setSelectedUser: (user: IUser) => void;
}

const User = ({ user, setSelectedUser }: IUserProps) => {
  const { iconUrl } = user;
  return (
    <div className={styles.userListItem} onClick={() => setSelectedUser(user)}>
      <div className={styles.userListItemBorder} />
      <figure>
        <picture>
          <img src={iconUrl} alt="user icon" />
        </picture>
      </figure>
    </div>
  );
};

export default User;
