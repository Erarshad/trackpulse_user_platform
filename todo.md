1-- put validation for if appquota got complete it should not allow to add ---done
2--> refresh quota on fetching of applist of appquota reboot required --done



matrix--

session life time  

session per day  

session per week  



SELECT COUNT(*) FROM event; -- for fetching all

SELECT COUNT(*)
FROM event
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);   -- for fetching last 7 day

SELECT COUNT(*)
FROM event
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);   -- for fetching last 30 day