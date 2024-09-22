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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const database_1 = __importDefault(require("./dist/database.js"));
const app_1 = __importDefault(require("./dist/app.js")); // Import the app
const PORT = process.env.PORT || 3000;
const startApp = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.default)();
    // Set the port for the app
    app_1.default.set("port", PORT);
    // Start the Express server
    app_1.default.listen(app_1.default.get("port"), () => {
      console.log(
        `Server is running on http://localhost:${app_1.default.get("port")}`
      );
    });
  });
startApp().catch((error) => {
  console.error("Error starting the application:", error);
});
