
export default function SearchBar({ value, onChange, onSearch }) {
    return (
        <div className="search">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="search meals .."
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}


