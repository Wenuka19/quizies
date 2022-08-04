import React from 'react'

export default function Question(props) {
    function checkStyle(selected, a_id, correct_id) {
        if (!props.checking) {
            if (selected) {
                return (
                    {
                        color: "#FFFFFF",
                        backgroundColor: "#114b5f"
                    }
                )
            }
            else {
                return (
                    {

                    }
                )
            }
        }
        else {
            if (selected) {
                if (a_id === correct_id) {
                    return {
                        backgroundColor: "#93d7a2",

                    }
                }
                else {
                    return (
                        {
                            backgroundColor: "#c14543"
                        }
                    )
                }
            }
            else {
                if (a_id === correct_id) {
                    return (
                        {
                            backgroundColor: "#86DC3D"
                        }
                    )
                }
            }
        }
    }

    const answerList = props.obj.answers;
    const answerComponents = answerList.map(q => <p key={q.id} style={checkStyle(q.isSelected, q.id, props.obj.correct_answer.id)} onClick={() => props.toSelect(props.obj.id, q.id)}>{q.text}</p>)
    return (
        <div className='question-box'>
            <h4>{props.obj.question}</h4>
            <div className="answers">
                {answerComponents}
            </div>
        </div>
    )
}
