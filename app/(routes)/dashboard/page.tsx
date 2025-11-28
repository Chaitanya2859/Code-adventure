import EnrollCourses from "./_component/EnrollCourses"
import ExploreMore from "./_component/ExploreMore"
import InviteFriend from "./_component/InviteFriend"
import Upgrade from "./_component/Upgrade"
import UserCurrentStatus from "./_component/UserCurrentStatus"
import WelcomeBanner from "./_component/WelcomeBanner"

const Dashboard = () => {
  return (
    <div className="p-8 md:px-16 lg:px-36 xl:px:48">
        <div className="grid grid-cols-3 gap-7">
            <div className="col-span-2">
                <WelcomeBanner />
                <EnrollCourses />
                <ExploreMore />
                <InviteFriend />
            </div>
            <div className="">
                <UserCurrentStatus />
                <Upgrade />
            </div>
        </div>
    </div>
  )
}

export default Dashboard