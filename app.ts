interface User {
  id: string;
  name: string;
  email: string;
}

class UserCRUD {
  private users: User[] = [];
  private userForm: HTMLFormElement;
  private userList: HTMLElement;
  private userIdInput: HTMLInputElement;
  private nameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;

  constructor() {
    this.userForm = document.getElementById("userForm") as HTMLFormElement;
    this.userList = document.getElementById("userList") as HTMLElement;
    this.userIdInput = document.getElementById("userId") as HTMLInputElement;
    this.nameInput = document.getElementById("name") as HTMLInputElement;
    this.emailInput = document.getElementById("email") as HTMLInputElement;

    this.userForm.addEventListener("submit", (e) => this.handleSubmit(e));

    this.renderUsers();
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const id = this.userIdInput.value;
    const name = this.nameInput.value;
    const email = this.emailInput.value;

    if (id) {
      this.updateUser(id, name, email);
    } else {
      this.addUser(name, email);
    }

    this.userForm.reset();
    this.userIdInput.value = "";
  }

  private addUser(name: string, email: string): void {
    const user: User = {
      id: new Date().toISOString(),
      name,
      email,
    };

    this.users.push(user);
    this.renderUsers();
  }

  private updateUser(id: string, name: string, email: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex].name = name;
      this.users[userIndex].email = email;
      this.renderUsers();
    }
  }

  private deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.renderUsers();
  }

  private editUser(id: string): void {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.userIdInput.value = user.id;
      this.nameInput.value = user.name;
      this.emailInput.value = user.email;
    }
  }

  private renderUsers(): void {
    this.userList.innerHTML = "";

    this.users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "user";
      userElement.innerHTML = `
          <div>
            <strong>${user.name}</strong> (${user.email})
          </div>
          <div>
            <button onclick="userCRUD.editUser('${user.id}')">Edit</button>
            <button onclick="userCRUD.deleteUser('${user.id}')">Delete</button>
          </div>
        `;
      this.userList.appendChild(userElement);
    });
  }
}

const userCRUD = new UserCRUD();
