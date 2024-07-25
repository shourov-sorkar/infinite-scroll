import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getUsers } from "./actions/getdata";

interface User {
  firstName: string;
}

const NUMBER_OF_USERS_TO_FETCH = 10;

export const App: React.FC = () => {
  const [offset, setOffset] = useState<number>(NUMBER_OF_USERS_TO_FETCH);
  const [users, setUsers] = useState<User[]>([]);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const apiUsers: User[] = await getUsers(offset, NUMBER_OF_USERS_TO_FETCH);
    setUsers((prevUsers) => [...prevUsers, ...apiUsers]);
    setOffset((prevOffset) => prevOffset + NUMBER_OF_USERS_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <div className='flex flex-col gap-3'>
      {users.map((user, index) => (
        <div key={index}>
          {user.firstName}
        </div>
      ))}
      <div ref={ref}>
        Loading...
      </div>
    </div>
  );
};
