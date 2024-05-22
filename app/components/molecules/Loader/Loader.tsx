const Loader: React.FC = () => {
    return (
        <div className="fixed bg-black bg-transparent bg-opacity-50 z-50 w-full h-full">
            <div className="absolute top-[45%] left-[49%] loader"></div>
        </div>
    );
};

export default Loader;