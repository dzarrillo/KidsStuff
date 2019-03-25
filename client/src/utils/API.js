import axios from "axios";

export default {
  // Gets all riddles
  getRiddles: function() {
    return axios.get("/api/riddles");
  },
  
};