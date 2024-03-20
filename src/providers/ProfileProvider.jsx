import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/profileReducer";

export default function ProfileProvider({ children }) {
    return (
        <ProfileContext.Provider value={{profileReducer, initialState}}>
            {children}
        </ProfileContext.Provider>
    );
}