import { useDispatch, useSelector } from "react-redux";
import { Chat } from "../components/Chat";
import { SideNav } from "../components/Sidenav";
import { RootState } from "../store";
import { setActiveChannel } from "../store/channels";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { data, activeChannelId } = useSelector(
    (state: RootState) => state.channels
  );

  useEffect(() => {
    // Check if there are channels and if the activeChannelId is not already set
    if (data.length > 0 && !activeChannelId) {
      dispatch(setActiveChannel({ id: data[0].id }));
    }
  }, [dispatch, data, activeChannelId]);
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <SideNav />
      <Chat />
    </div>
  );
}
