const { Second } = require('../../models/ppdtModel')

const ppdthome = async (req, res) => {
    let picture = "";
    let username = "";
    let email = "";
    if (req.isAuthenticated()) {
      picture = req.user.picture;
      username= req.user.username;
      email=req.user.email;
      console.log(picture);
      res.render("ppdthome",
        {
          picture: picture,
          username: username,
          email: email
      });
    }  
    else {
      res.redirect("/login");
    }
    
}



module.exports = {ppdthome} 
