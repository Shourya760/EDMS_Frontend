import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePassword } from "../services/authService";

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await updatePassword(
                {
                    token,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })

            if (response.success) {
                navigate("/login");
            } else {
                alert(response.message)
                console.log(response.message)
            }

            console.log({
                token,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });
        } catch (error) {
            console.log("erorr while Updating PAssword in the Frontend: ", error)
        } finally {
            setLoading(false)
        }

    };


    if (loading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "400px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Reset Password
                </h2>

                <div style={{ marginBottom: "15px" }}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#2563eb",
                        color: "#fff",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;