const axios = require('axios');

exports.convertCurrency = async (req, res) =>{
    try{
        const{ amount, from, to} = req. query;

        if (!amount || !from || !to){
            return res.status(400).json({
                message: "Se requieren amount, from y to"
            });
        }

        const response = await axios.get(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if(!response.data.rates || !response.data.rates[to]){
            return res.status(400).json({
                message: "Moneda Invalida"
            });
        }

        const rate = response.data.rates[to];
        const converted = amount * rate;

        res.json({
            from,
            to,
            rate,
            originalAmount: amount,
            convertedAmount: converted
        })
    } catch(error){
        console.error("Error API externa:", error.message)
        res.status(500).json({
            message: "Error al consultar API externa"
        });
    }
};