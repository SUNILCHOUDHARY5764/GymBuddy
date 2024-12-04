const Validator = (req, res, next) => {
   const { name, email, password, gender, age, height, weight, disease } = req.body;
   
   if (!name || !email || !password || !gender || !age || !height || !weight || !disease) {
       return res.status(400).send({
           err: "Fill all the details"
       });
   }

   if (age < 16 || age >= 60) {
       return res.status(400).send({
           err: "You are not eligible to create an account because of your age"
       });
   }

   next();
};

module.exports = {
   Validator
};