  import { useState, useContext, useEffect } from "react";
  import { Context } from "../contexts/store";
  import { api } from "../services/api";
  import { useNavigate } from "react-router-dom";
  import TextField from "@mui/material/TextField";
  import IconButton from "@mui/material/IconButton";
  import List from "@mui/material/List";
  import ListItem from "@mui/material/ListItem";
  import ListItemText from "@mui/material/ListItemText";
  import Grid from "@mui/material/Grid";
  import SearchIcon from "@mui/icons-material/Search";
  import SortIcon from "@mui/icons-material/Sort";

  interface User {
    prenom: string;
    nom: string;
    tel: string;
    email: string;
  }

  const Users = () => {
    const navigate = useNavigate();
    const { token, admin } = useContext(Context);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState(false);

    useEffect(() => {

      if (!token)
        navigate('/');
      if (!admin)
        navigate('/cours');

      api.get<User[]>('/users', token).then(res => {
        setUsers(res.data);
      })
    }, [admin, token]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };

    const handleSort = () => {
      setSortType(!sortType);
    };

    let filteredUsers = users.filter((user: User) => {
      let searchArray = search.toLowerCase().split(' ');
      return searchArray.every(item => user.prenom.toLowerCase().includes(item) || user.nom.toLowerCase().includes(item));
    });
    

    if (sortType) {
      filteredUsers.sort((a: User, b: User) => (a.prenom > b.prenom) ? 1 : -1);
    }

    return (
      <Grid container direction="column" alignContent="center" justifyContent="center" alignItems="center" className="mt-4">
        <Grid item xs={12}>
          <TextField label="Rechercher" value={search} onChange={handleSearch} />
          <IconButton onClick={handleSort}>
            <SortIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <List>
            {filteredUsers.map((user: User, index: number) => {
              return (
                <ListItem key={index}>
                  <ListItemText primary={`${user.prenom} ${user.nom}`} secondary={`Tel: ${user.tel} | Email: ${user.email}`} />
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </Grid>
    );
  };

  export default Users;
