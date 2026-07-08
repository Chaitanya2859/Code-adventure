import EnrollCourses from "./_component/EnrollCourses"
import ExploreMore from "./_component/ExploreMore"
import Upgrade from "./_component/Upgrade"
import UserCurrentStatus from "./_component/UserCurrentStatus"
import WelcomeBanner from "./_component/WelcomeBanner"

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 lg:px-36 xl:px-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="col-span-1 md:col-span-2">
                <WelcomeBanner />
                <EnrollCourses />
                <ExploreMore />
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