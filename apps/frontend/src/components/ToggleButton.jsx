import CloseIcon from './icons/CloseIcon';
import MenuIcon from './icons/MenuIcon';

export default function ToggleButton({ isOpen, onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md"
        >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
    );
}
