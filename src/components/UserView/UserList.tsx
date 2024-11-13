import User from "./User";
import * as styles from '../../index.module.scss'

const UserList = ({users, setSelectedUser}) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <User key={user.id} user={user} setSelectedUser={setSelectedUser}/>
      ))}
    </div>
  );
};
export default UserList;
