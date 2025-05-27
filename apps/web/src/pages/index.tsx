import { useDispatch, useSelector } from "react-redux";
import { Chat } from "../components/Chat";
import { SideNav } from "../components/Sidenav";
import { RootState } from "../store";
import { addChannels, setActiveChannel } from "../store/channels";
import { useEffect } from "react";
import { useGetChannelsQuery } from "../store/api";
import { addMessages } from "../store/messages";

export default function Home() {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state: RootState) => state.channels);
  const {
    data: channels,
    isFetching,
    isError,
  } = useGetChannelsQuery(undefined);

  useEffect(() => {
    if (channels && !activeChannelId) {
      dispatch(addChannels(channels.data));
      channels.data.forEach((channel) => {
        dispatch(addMessages(channel.messages));
      });
    }
    if (channels && channels.data.length > 0 && !activeChannelId) {
      dispatch(setActiveChannel({ id: channels.data[0].id }));
    }
  });
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching channels</div>;
  }
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <SideNav />
      {activeChannelId && <Chat channelId={activeChannelId} />}
    </div>
  );
}
