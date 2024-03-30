const Contato = require('../models/ContatoModel');

exports.index = (req, res) =>  {
    const contato = {};
    res.locals.contato = contato;
    res.render('contato');
}

exports.register = async (req, res) =>  {
    try{
    const contato = new Contato(req.body);
    await contato.register();


    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/index'));
        return;
    }

    req.flash('success', 'Contato registrado com sucesso.')
    req.session.save(() => res.redirect(`/`));
    
    return;

    }catch(e){
        console.log(e);
        return res.render('404');
    }

};

exports.editIndex = async function (req,res){
     try {
        const contato = await Contato.buscaPorId(req.params.id);
        res.render('contato', { contato: contato });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
};

exports.edit = async function(req, res){
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
    
        req.flash('success', 'Contato editado com sucesso.')
        req.session.save(() => res.redirect(`/`));
        
        return;
    }catch(e){
        console.log(e);
        res.render('404');
    }

};

exports.delete = async function (req,res){
    if(!req.params.id) return res.render('404');

    console.log(req.params.id);


    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.')
    req.session.save(() => res.redirect(`/`));
};