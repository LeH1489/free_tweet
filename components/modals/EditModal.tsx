import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  //lấy user hiện tại
  const { data: curentUser } = useCurrentUser();

  //hook fetch api của 1 user bất kỳ
  const { mutate: mutateFetchUser } = useUser(curentUser?.id);

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(curentUser?.profileImage);
    setCoverImage(curentUser?.coverImage);
    setName(curentUser?.name);
    setUserName(curentUser?.username);
    setBio(curentUser?.bio);
  }, [
    curentUser?.name,
    curentUser?.username,
    curentUser?.bio,
    curentUser?.profileImage,
    curentUser?.coverImage,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchUser(); //sau khi edit xong thì fetch lại user
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        label="Upload profile image"
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        label="Upload cover image"
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setCoverImage(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
