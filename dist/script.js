const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const url = 'https://twitch-proxy.freecodecamp.rocks/twitch-api/';

const App = () => {
  const [data, setData] = React.useState([]);
  const [sortOnline, setSortOnline] = React.useState(false);
  const fetchData = () => {
    users.forEach(async user => {
      const res = await axios.all([
      axios.get(url + 'streams/' + user),
      axios.get(url + 'channels/' + user)]);

      setData(p => [
      ...p,
      { ...res[0].data.stream, user: res[1].data }]);

    });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  const sorted = React.useMemo(() => {
    if (sortOnline)
    return [...data].sort(d => "channel" in d ? -1 : 1);else

    return [...data];
  }, [sortOnline, data]);

  return /*#__PURE__*/(
    React.createElement("div", { id: "app-wrapper" }, /*#__PURE__*/
    React.createElement("h1", { id: "title" }, "Twitch streams data"), /*#__PURE__*/
    React.createElement("div", { className: "btns-wrapper" }, /*#__PURE__*/
    React.createElement("button", {
      className: "btn",
      onClick: () => setSortOnline(true) }, "Online first"), /*#__PURE__*/

    React.createElement("button", {
      className: "btn",
      onClick: () => setSortOnline(false) }, "Back to list")),


    sorted.length ? sorted.map((d) => /*#__PURE__*/
    React.createElement("div", {
      key: d.user.name,
      className:
      "channel" in d ?
      "user-wrapper online" :
      "user-wrapper" }, /*#__PURE__*/


    React.createElement("a", {
      className: "user-link",
      href: `https://twitch.tv/${d.user.name}`,
      target: "_blank",
      rel: "noopener" }, /*#__PURE__*/

    React.createElement("img", {
      className: "user-logo",
      src: d.user.logo,
      alt: " " }),

    d.user.display_name), /*#__PURE__*/

    React.createElement("div", { className: "stream-info" },
    "channel" in d ? d.channel.status : "Offline"))) : /*#__PURE__*/



    React.createElement(Loading, null)));



};

const Loading = () => {
  return /*#__PURE__*/(
    React.createElement("svg", { className: "load-screen" }, /*#__PURE__*/
    React.createElement("circle", {
      className: "load-circle",
      cx: "50%",
      cy: "50%",
      r: "100" })));



};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));