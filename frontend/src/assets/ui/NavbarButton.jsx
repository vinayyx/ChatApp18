export default function NavbarButton() {
    return (
        <>
            <style>{`
                @keyframes shine {
                    0% {
                        background-position: 0% 50%;
                    }
            
                    50% {
                        background-position: 100% 50%;
                    }
            
                    100% {
                        background-position: 0% 50%;
                    }
                }
            
                .button-bg {
                    background: conic-gradient(from 0deg, #00F5FF, #000, #000, #00F5FF, #000, #000, #000, #00F5FF);
                    background-size: 300% 300%;
                    animation: shine 6s ease-out infinite;
                }
            `}</style>
            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                <button className="px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-800">
                    Chat Now
                </button>
            </div>
        </>
    );
};