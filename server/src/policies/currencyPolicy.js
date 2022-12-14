// Import Joi Validation module
const Joi = require('joi');
const ApiError = require('../utilities/ApiError');

module.exports = {
  // [1] POST Validation
  validateCurrency(req, res, next){
    console.log(req.body);
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      symbol: Joi.string().min(3).max(3).required(),
      current_price: Joi.number().required(),
      price_change_24h: Joi.number().required(),
      price_change_percentage_24h: Joi.number().required(),
      high_24h: Joi.number().required(),
      low_24h: Joi.number().required(),
      status: Joi.string().min(3).max(50).required(),
      total_volume: Joi.number().required(),
      description: Joi.string().min(3).max(2000).required(),
      nation: Joi.string().min(3).max(50).required(),
      image: Joi.any(),
      uploadedFile: Joi.string()
    });
    
    // Return one of two values
    const { error, value } = schema.validate(req.body);

    // ON VALIDATION ERROR: We call Error Middleware & Pass Bad Request with Dynamic Validation Error Message
    if ( error ) {
      console.log(error);
      switch(error.details[0].context.key){
        case 'name':
          next(ApiError.badRequest('You must provide a valid name for the Central Bank Digital Coin (CBDC)'))
          break
        
        case 'symbol':
          next(ApiError.badRequest('You must provide a valid symbol for the Central Bank Digital Coin (CBDC) & must ensure it is ONLY three characters'))
          break
          
        case 'current_price':
          next(ApiError.badRequest('You must provide a valid CBDC current price information'))
          break

        case 'price_change_24h':
          next(ApiError.badRequest('You must provide a valid CBDC price change 24h information'))
          break

        case 'price_change_percentage_24h':
          next(ApiError.badRequest('You must provide a valid CBDC price change percentage information'))
          break

        case 'high_24h':
          next(ApiError.badRequest('You must provide a valid CBDC high 24hr price information'))
          break
          
        case 'low_24h':
          next(ApiError.badRequest('You must provide a valid CBDC low 24hr price information'))
          break

        case 'total_volume':
          next(ApiError.badRequest('You must provide a valid CBDC volume information'))
          break

        case 'status':
        case 'description':
        case 'nation':
          next(ApiError.badRequest('You must provide additional CBDC trading details'))
          break

        case 'image':
        case 'uploadedFile':
          next(ApiError.badRequest('The existing CBDC image URL or path are not in a valid format - please re-upload the image'))
          break

        default: 
          next(ApiError.badRequest('Invalid Form Information - please check form information and submit again'))
      }

    // ON SUCCSSS: We pass to next middleware
    } else {
      next();
    }
  }
  
}