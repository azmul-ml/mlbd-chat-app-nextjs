import { ReactElement } from "react";
import PageLeft from "../../src/components/common/layout/PageLeft";
import Chats from "../../src/features/room/group/screens/Chats";

const Room = () => {
  return (
    <>
      <Chats />
    </>
  );
};
export default Room;

Room.getLayout = (page: ReactElement) => {
  return (
    <>
      <PageLeft />
      {page}
    </>
  );
};
