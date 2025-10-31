import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
    const { updateUser, isPending } = useUpdateMyUser();
    return (
        <UserProfileForm onSave={updateUser} isLoading={isPending} />
    )
};

export default UserProfilePage