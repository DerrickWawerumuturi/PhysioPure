
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { SaveButtonProps } from '@/types';


const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isLoading, isDraftSaved, errorMessage }) => {
    return (
        <div>
            <Button
                onClick={onClick}
                disabled={isLoading}
                className={cn(
                    "rounded-2xl bg-green-600",
                    {
                        isLoading: "animate-spin"
                    })}
            >
                {isLoading ? "Saving..." : "Publish"}
            </Button>
            {isDraftSaved && <p>Draft saved!</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default SaveButton;
