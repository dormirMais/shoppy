import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  // 로그인한 사용자가 있는지 확인한다.
  // 사용자가 admin권한이 있는지 확인한다.
  // 조건에 맞지 않는 경우 /로 이동한다.
  // 조건에 부합하는 경우에만 전달된 children을 보여주도록 한다.

  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
    // true를 사용한다면, navigate에 적힌 주소로 넘어간 후 뒤로가기를 하더라도 방금의 페이지로 돌아오지 않게된다.
    // 이 때는 자신의 메인 페이지 ("/")로 돌아오게 됩니다. false는 뒤로가기가 가능하며 이 것이 기본 값이다.
  }

  return children;
}
