const Loader: React.FC = () => {
    return (
        <div className="fixed bg-black top-0 left-0 bg-opacity-50  z-[100] w-full h-full">
            <div className="absolute top-[45%] left-[49%] loader"></div>
        </div>
    );
};

export default Loader;