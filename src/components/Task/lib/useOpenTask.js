import { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

export default (initialState) => {
  const [open, setOpen] = useState(initialState);
  const [urlSearch, setUrlSearch] = useState("");
  const history = useHistory();
  const match = useRouteMatch();
  const { search } = useLocation();

  useEffect(() => {
    if (search) setUrlSearch(search);
  }, [search]);

  const openTask = (id) => {
    setOpen(true);
    history.push(`${match.url}/${id}`);
  };

  const closeTask = () => {
    setOpen(false);
    const timeout = setTimeout(() => {
      history.push(match.url + urlSearch);
      clearTimeout(timeout);
    }, 300);
  };

  return {
    open,
    openTask,
    closeTask,
  };
};
