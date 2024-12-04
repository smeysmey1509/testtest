var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
class UserCRUD {
  constructor() {
    this.users = [];
    this.userForm = document.getElementById("userForm");
    this.userList = document.getElementById("userList");
    this.userIdInput = document.getElementById("userId");
    this.nameInput = document.getElementById("name");
    this.emailInput = document.getElementById("email");
    this.userForm.addEventListener("submit", (e) => this.handleSubmit(e));
    this.renderUsers();
  }
  handleSubmit(event) {
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
  addUser(name, email) {
    const user = {
      id: new Date().toISOString(),
      name,
      email,
    };
    this.users.push(user);
    this.renderUsers();
  }
  updateUser(id, name, email) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex].name = name;
      this.users[userIndex].email = email;
      this.renderUsers();
    }
  }
  deleteUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.renderUsers();
  }
  editUser(id) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.userIdInput.value = user.id;
      this.nameInput.value = user.name;
      this.emailInput.value = user.email;
    }
  }
  renderUsers() {
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
