import mongoose from "mongoose";
import colors from "colors";

function connect() {
  //   const dbUri:string = config.dbUri
  return mongoose
    .connect(process.env.db as string)
    .then(() => {
      console.log(colors.blue("connected to db"));
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default connect;
