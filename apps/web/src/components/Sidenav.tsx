import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveChannel } from "../store/channels";
import { logout } from "../store/auth";
import { useLogoutMutation } from "../store/api";

export const SideNav = () => {
  const [newChannel, setNewChannel] = useState(``);
  const dispatch = useDispatch();
  const [logoutAuth] = useLogoutMutation();

  const { data: channels, activeChannelId } = useSelector(
    (state: RootState) => state.channels
  );

  const handleAddChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newChannel) {
      return;
    }
    setNewChannel(``);
  };

  const handleChannelClick = (id: number) => {
    dispatch(setActiveChannel({ id }));
  };

  const handleLogout = async () => {
    await logoutAuth(undefined);
    dispatch(logout());
    window.location.href = `/auth`;
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="sticky top-0 w-full p-8">
        {/* Fixed content at the top */}
        <form onSubmit={handleAddChannel} className="flex flex-col">
          <label htmlFor="channel" className="text-sm mb-2">
            Add new channel
          </label>
          <input
            id="channel"
            className="px-2 py-3 rounded"
            type="text"
            placeholder="e.g. random-and-fun"
            value={newChannel}
            onChange={(e) => {
              const modifiedValue = e.target.value
                .replace(/\s+/g, "-")
                .toLowerCase();
              setNewChannel(modifiedValue);
            }}
          />
        </form>
      </div>
      <div className="overflow-y-auto flex-grow">
        {/* Main content goes here */}
        <div>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`py-2 px-8 hover:cursor-pointer ${
                channel.id === activeChannelId ? "bg-slate-800 text-white" : ""
              }`}
              onClick={() => handleChannelClick(channel.id)}
            >
              <p>#{channel.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 w-full p-8">
        {/* Fixed content at the bottom */}
        <p
          className="opacity-40 hover:opacity-100 cursor-pointer text-sm"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};
