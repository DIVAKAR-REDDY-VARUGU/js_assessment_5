$(document).ready(function(){
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/quiz',function (a) {
        // console.log(a);
        let h1=$('<h1>')
        h1.text('The Quiz App')
        h1.addClass('quiz-heading')

        let formWrapper=$('<div>')
        formWrapper.addClass('formWrappe')
            let form=$('<form>')
            form.addClass('form')
                

                let QdivWrapper=$('<div>')
                let count_out=1
                let count_in=1
                for (const i of a) 
                {
                    let Qdiv=$('<div>')
                        Qdiv.addClass('Qdiv-wrapper')

                            let question=$('<h2>')
                            question.addClass('quiz-question')
                            question.text('Q'+i.id+'.'+i.question)

                            let optWrapper=$('<div>')
                            optWrapper.addClass('options-wrapper')
                            
                            let option_val=1
                                for (const j of i.options) {
                                    let option1=$('<div>')
                                    option1.addClass('option')
                                        let input1=$('<input>')
                                        input1.attr(
                                            {
                                                type:'radio',
                                                name:count_in,
                                                id:count_out,
                                                value:option_val
                                            }
                                        )
                                        let label=$('<label>')
                                        label.attr('for',count_out)
                                        label.text(j)
                                        label.addClass('labels')
                                        option1.append(input1,label)
                                        optWrapper.append(option1)
                                        count_out++
                                        option_val++
                                }
                                
                                
                                Qdiv.append(question,optWrapper)
                                QdivWrapper.append(Qdiv)        
                                        
                    count_in++
                }

                let submitwrapper=$(`<input type="submit" id='form-submit'>`)
                
            form.append(QdivWrapper,submitwrapper)
                
            let scorewrapper=$('<div>')
            scorewrapper.addClass('score-div')
                let scorelabel=$('<div>')
                scorelabel.text('Score :')
                    scorelabel.addClass('scorelabel')

                let score=$('<p>')
                    score.text('O/5')
                    score.addClass('marks')

            scorewrapper.append(scorelabel,score)
               

                 
        formWrapper.append(form,scorewrapper)
        $('body').append(h1,formWrapper)
        form.submit(function(e){
                        e.preventDefault();
                        let obj={}
                        for(let i=1;i<count_in;i++){
                            for (const j of $('input[name='+i+']')) {
                                if(j.checked===true){
                                    obj[j.name]=j.value
                                }
                            }
                        }
                        updateScore(obj)
                    })
        function updateScore(obj) {
            let marks=0
            console.log(obj);
            for (let it=0;it<a.length;it++)
            {   
                console.log(a[it].id,'Q -> ',a[it].answer,' == ',obj[''+(it+1)+'']);
                if(a[it].answer==obj[''+(it+1)+'']){
                    console.log('correct');
                    marks++
                }
            }
            console.log('marks = ',marks);
            score.text(marks+'/5')
        }
    })
})
