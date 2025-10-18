import ScoreGauge from "~/components/ScoreGauge";

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor = score > 70 ? "text-green-600"
        : score > 49 ? "text-yellow-600"
            : "text-red-600";

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>

                </div>
                    <p className="text-2xl">
                        <span className={textColor}></span>
                    </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated base on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Nada & Gaya" score={feedback.toneAndStyle.score} />
            <Category title="Isi" score={feedback.content.score} />
            <Category title="Struktur" score={feedback.structure.score} />
            <Category title="Keterampilan" score={feedback.skills.score} />
        </div>
    )
}
export default Summary
