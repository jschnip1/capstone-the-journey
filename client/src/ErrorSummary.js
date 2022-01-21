function ErrorSummary({ errors }) {

    if (!errors || errors.length === 0) {
        return null;
    }

    return <>
        <div>
            {errors.map((err, index) => <div key={index}>{err}</div>)}
        </div>
    </>

}

export default ErrorSummary;