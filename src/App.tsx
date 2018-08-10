import React, { ChangeEvent, Component } from "react";
import { observer } from "mobx-react";
import WishListView from "./components/WishListView";
import { IGroup, IUser } from "./models/Group";

export interface Props {
  group: IGroup;
}

interface State {
  selectedUser: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selectedUser: "" };
  }

  onSelectUser = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedUser: e.target.value });
  };
  render() {
    const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUser);

    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://raw.githubusercontent.com/mweststrate/mst-course/lesson5/src/assets/santa-claus.png"
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">WishList</h1>
        </header>
        <select onChange={this.onSelectUser}>
          <option>- Select user -</option>
          {Array.from(group.users.values()).map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={group.drawLots}>Draw lots</button>
        {selectedUser && <User user={selectedUser} />}
      </div>
    );
  }
}

const User = observer(({ user }: { user: IUser }) => (
  <div>
    <WishListView wishList={user.wishList} />
    <button onClick={user.getSuggestions}>Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ""}</h2>
    {user.recipient && (
      <WishListView wishList={user.recipient.wishList} readonly />
    )}
  </div>
));

export default App;
