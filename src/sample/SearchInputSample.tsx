import SearchInput from "@/components/common/SearchInput";
const SearchInputSample = () => {
    //1번 서치 방법 부모컴포넌트에 이걸 두고 서치 컴포넌트로 전달해서 여기서 검색 로직 처리. (2번은 서치 컴포넌트안에서.)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        console.log(e.target.value);
        };
    return (
        <div>
            <SearchInput handleChange={handleChange} />
        </div>
    );
};

export default SearchInputSample;