interface UserProps {
  iconUrl: string;
}
const User = ({ iconUrl }: UserProps) => {
  return (
    <div className="user-listItem">
      <div className="user-listItemBorder" />
      <figure>
        <picture>
          <img
            src={iconUrl}
            alt="user icon"
          />
        </picture>
      </figure>
    </div>
  );
};

export default User;
