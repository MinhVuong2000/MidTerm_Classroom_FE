

export default function OneAssignment({name, point}){
    return (
        <div sx={{ maxWidth: 300,
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 1,
            p: 2}}>
            <h1>{name}</h1>
            <p>{point}</p>
        </div>
    )
}